using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Unity.Lifetime;

namespace MagniCollegeManagementSystem.App_Start
{
    #region PerRequestLifetimeManagerCustom
    /// <summary>
    /// A <see cref="LifetimeManager"/> that holds onto the instance given to it during
    /// the lifetime of a single HTTP request.
    /// This lifetime manager enables you to create instances of registered types that behave like
    /// singletons within the scope of an HTTP request.
    /// See remarks for important usage information.
    /// </summary>
    /// <remarks>
    /// <para>
    /// Although the <see cref="PerRequestLifetimeManager"/> lifetime manager works correctly and can help
    /// in working with stateful or thread-unsafe dependencies within the scope of an HTTP request, it is
    /// generally not a good idea to use it when it can be avoided, as it can often lead to bad practices or
    /// hard to find bugs in the end-user's application code when used incorrectly. 
    /// It is recommended that the dependencies you register are stateless and if there is a need to share
    /// common state between several objects during the lifetime of an HTTP request, then you can
    /// have a stateless service that explicitly stores and retrieves this state using the
    /// <see cref="HttpContext.Items"/> collection of the <see cref="HttpContext.Current"/> object.
    /// </para>
    /// <para>
    /// For the instance of the registered type to be disposed automatically when the HTTP request completes,
    /// make sure to register the <see cref="UnityPerRequestHttpModule"/> with the web application.
    /// To do this, invoke the following in the Unity bootstrapping class (typically UnityMvcActivator.cs):
    /// <code>DynamicModuleUtility.RegisterModule(typeof(UnityPerRequestHttpModule));</code>
    /// </para>
    /// </remarks>
    public class PerRequestLifetimeManagerCustom : LifetimeManager,
                                             IInstanceLifetimeManager,
                                             IFactoryLifetimeManager,
                                             ITypeLifetimeManager
    {
        private readonly object _lifetimeKey = new object();

        /// <summary>
        /// Retrieves a value from the backing store associated with this lifetime policy.
        /// </summary>
        /// <returns>The desired object, or null if no such object is currently stored.</returns>
        public override object GetValue(ILifetimeContainer container = null)
        {
            return UnityPerRequestHttpModule.GetValue(_lifetimeKey);
        }

        /// <summary>
        /// Stores the given value into the backing store for retrieval later.
        /// </summary>
        /// <param name="newValue">The object being stored.</param>
        /// <param name="container"></param>
        public override void SetValue(object newValue, ILifetimeContainer container = null)
        {
            UnityPerRequestHttpModule.SetValue(_lifetimeKey, newValue);
        }

        /// <summary>
        /// Removes the given object from the backing store.
        /// </summary>
        public override void RemoveValue(ILifetimeContainer container = null)
        {
            var disposable = GetValue() as IDisposable;

            disposable?.Dispose();

            UnityPerRequestHttpModule.SetValue(_lifetimeKey, null);
        }

        /// <summary>
        /// Creates clone
        /// </summary>
        /// <returns></returns>
        protected override LifetimeManager OnCreateLifetimeManager()
        {
            return new PerRequestLifetimeManagerCustom();
        }
    }

    public class UnityPerRequestHttpModule : IHttpModule
    {
        private static readonly object ModuleKey = new object();

        internal static object GetValue(object lifetimeManagerKey)
        {
            var dict = GetDictionary(HttpContext.Current);

            if (dict != null)
            {
                if (dict.TryGetValue(lifetimeManagerKey, out var obj))
                {
                    return obj;
                }
            }

            return LifetimeManager.NoValue;
        }

        internal static void SetValue(object lifetimeManagerKey, object value)
        {
            var dict = GetDictionary(HttpContext.Current);

            if (dict == null)
            {
                dict = new Dictionary<object, object>();

                HttpContext.Current.Items[ModuleKey] = dict;
            }

            dict[lifetimeManagerKey] = value;
        }

        /// <summary>
        /// Disposes the resources used by this module.
        /// </summary>
        public void Dispose()
        {
        }

        /// <summary>
        /// Initializes a module and prepares it to handle requests.
        /// </summary>
        /// <param name="context">An <see cref="HttpApplication"/> that provides access to the methods, properties,
        /// and events common to all application objects within an ASP.NET application.</param>
        public void Init(HttpApplication context)
        {
            (context ?? throw new ArgumentNullException(nameof(context))).EndRequest += OnEndRequest;
        }

        private void OnEndRequest(object sender, EventArgs e)
        {
            var app = (HttpApplication)sender;

            var dict = GetDictionary(app.Context);

            if (dict != null)
            {
                foreach (var disposable in dict.Values.OfType<IDisposable>())
                {
                    disposable.Dispose();
                }
            }
        }

        private static Dictionary<object, object> GetDictionary(HttpContext context)
        {
            if (context == null)
            {
                throw new InvalidOperationException(
                    "The PerRequestLifetimeManager can only be used in the context of an HTTP request.Possible causes for this error are using the lifetime manager on a non-ASP.NET application, or using it in a thread that is not associated with the appropriate synchronization context.");
            }

            var dict = (Dictionary<object, object>)context.Items[ModuleKey];

            return dict;
        }
    }
    #endregion
}